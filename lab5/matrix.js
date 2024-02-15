function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
	// dataArray is a 2D array
	// complete this function based on the showResult function
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    
    let rows = dataArray.length;
    let cols = dataArray[0].length;

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.innerHTML = dataArray[i][j];
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    let result;
    // Call your matrix calculation functions here
    if (operation === 'add') { 
        result = addMatrices(matrix1, matrix2); 
    }
    else if (operation === 'subtract') { 
        result = subtractMatrices(matrix1, matrix2); 
    }
    else if (operation === 'multiply') { 
        result = multiplyMatrices(matrix1, matrix2); 
    }
	// prints suitable messages for impossible situation
    if (result && result.length > 0) {
        showResult2D('The Result', 'matrix3', result); // use suitable function for printing results 
    }
   
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
	// provide the code
    // cannot add if different sizes (number of rows and columns don't match)
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.error("Error: Cannot add matrices of different sizes.");
        return;
    }

    let rows = matrix1.length;
    let cols = matrix1[0].length;
    let result = [];
    
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(matrix1[i][j] + matrix2[i][j]);
        }
        result.push(row)
    }
    return result;
}
const subtractMatrices = function (matrix1, matrix2) { 
	// provide the code
    // cannot subtract if different sizes (number of rows and columns don't match)
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.error("Error: Cannot subtract matrices of different sizes.");
        return;
    }
    
    let rows = matrix1.length;
    let cols = matrix1[0].length;
    let result = [];
    
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(matrix1[i][j] - matrix2[i][j]);
        }
        result.push(row)
    }
    return result;
};
const multiplyMatrices = (matrix1, matrix2) => { 
	// provide the code
    // cannot multiply if # of col of matrix1 dont match # of row of matrix2
    if (matrix1[0].length !== matrix2.length) {
        console.error("Error: Cannot multiply matrices of different sizes.");
        return [];
    }

    let rows = matrix1.length;
    let cols = matrix2[0].length;
    let rows2 = matrix2.length;
    let result = [];

    for (let i = 0; i < rows; i++) {
        let rslt = [];
        for (let j = 0; j < cols; j++) {
            let rslt2 = 0;
            for (let k = 0; k < rows2; k++) {
                rslt2 += matrix1[i][k] * matrix2[k][j];
            }
            rslt.push(rslt2);
        }
        result.push(rslt);
    }
    return result;
};
