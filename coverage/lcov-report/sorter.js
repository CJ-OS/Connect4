/* eslint-disable */
const addSorting = (function () {
    'use strict';
    let cols;
    const currentSort = {
        index: 0,
        desc: false
    };

    // returns the summary table element
    function getTable() {
        return document.querySelector('.coverage-summary');
    }

    // returns the thead element of the summary table
    function getTableHeader() {
        return getTable().querySelector('thead tr');
    }

    // returns the tbody element of the summary table
    function getTableBody() {
        return getTable().querySelector('tbody');
    }

    // returns the th element for nth column
    function getNthColumn(n) {
        return getTableHeader().querySelectorAll('th')[n];
    }

    function onFilterInput() {
        const searchValue = document.getElementById('fileSearch').value;
        const rows = document.getElementsByTagName('tbody')[0].children;
        for (const row of rows) {
            if (
                row.textContent
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            ) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }

    }

    // loads the search box
    function addSearchBox() {
        const template = document.getElementById('filterTemplate');
        const templateClone = template.content.cloneNode(true);
        templateClone.getElementById('fileSearch').oninput = onFilterInput;
        template.parentElement.appendChild(templateClone);
    }

    // loads all columns
    function loadColumns() {
        const colNodes = getTableHeader().querySelectorAll('th');
        const cols = [];

        for (const colNode of colNodes) {
            const col = {
                key: colNode.getAttribute('data-col'),
                sortable: !colNode.getAttribute('data-nosort'),
                type: colNode.getAttribute('data-type') || 'string'
            };
            cols.push(col);
            if (col.sortable) {
                col.defaultDescSort = col.type === 'number';
                colNode.innerHTML += '<span class="sorter"></span>';
            }
        }
        return cols;

    }

    // attaches a data attribute to every tr element with an object
    // of data values keyed by column name
    function loadRowData(tableRow) {
        const tableCols = tableRow.querySelectorAll('td');
        const data = {};

        for (let i = 0; i < tableCols.length; i += 1) {
            const colNode = tableCols[i];
            const col = cols[i];
            let val = colNode.getAttribute('data-value');
            if (col.type === 'number') {
                val = Number(val);
            }
            data[col.key] = val;
        }
        return data;
    }

    // loads all row data
    function loadData() {
        const rows = getTableBody().querySelectorAll('tr');

        for (const row of rows) {
            row.data = loadRowData(row);
        }

    }

    // sorts the table using the data for the ith column
    function sortByIndex(index, desc) {
        const key = cols[index].key;
        const sorter = function (a, b) {
            a = a.data[key];
            b = b.data[key];
            return a < b ? -1 : a > b ? 1 : 0;
        };

        const finalSorter = desc
            ? (a, b) => -1 * sorter(a, b)
            : sorter;

        const tableBody = document.querySelector('.coverage-summary tbody');
        const rowNodes = tableBody.querySelectorAll('tr');
        const rows = [];

        for (const rowNode of rowNodes) {
            rows.push(rowNode);
            tableBody.removeChild(rowNode);
        }


        rows.sort(finalSorter);

        for (const row of rows) {
            tableBody.appendChild(row);
        }

    }

    // removes sort indicators for current column being sorted
    function removeSortIndicators() {
        const col = getNthColumn(currentSort.index);
        let cls = col.className;

        cls = cls.replace(/ sorted$/, '').replace(/ sorted-desc$/, '');
        col.className = cls;
    }

    // adds sort indicators for current column being sorted
    function addSortIndicators() {
        getNthColumn(currentSort.index).className += currentSort.desc
            ? ' sorted-desc'
            : ' sorted';
    }

    // adds event listeners for all sorter widgets
    function enableUI() {
        const ithSorter = function (i) {
            const col = cols[i];

            return function () {
                let desc = col.defaultDescSort;

                if (currentSort.index === i) {
                    desc = !currentSort.desc;
                }
                sortByIndex(i, desc);
                removeSortIndicators();
                currentSort.index = i;
                currentSort.desc = desc;
                addSortIndicators();
            };
        };

        for (let i = 0; i < cols.length; i += 1) {
            if (cols[i].sortable) {
                const el = getNthColumn(i).querySelector('.sorter').parentElement;
                if (el.addEventListener) {
                    el.addEventListener('click', ithSorter(i));
                } else {
                    el.attachEvent('onclick', ithSorter(i));
                }
            }
        }
    }

    // adds sorting functionality to the UI
    return function () {
        if (!getTable()) {
            return;
        }
        cols = loadColumns();
        loadData();
        addSearchBox();
        addSortIndicators();
        enableUI();
    };
})();

window.addEventListener('load', addSorting);

