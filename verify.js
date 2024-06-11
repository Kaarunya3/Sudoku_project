function validateSudoku() {
  const DIM = 9;
  let sudoku = [];

  // Populate the sudoku array from the grid
  for (let i = 0; i < DIM; i++) {
    sudoku[i] = [];
    for (let j = 0; j < DIM; j++) {
      const cellValue = document.getElementById(`${i+1},${j+1}`).value;
      sudoku[i][j] = parseInt(cellValue); // Convert to integer or use 0 if not a valid number
    }
  }
  for(let i=0;i<DIM;i++)
  {
    for(let j=0;j<DIM;j++)
    {
      if(!sudoku[i][j])
      {
        alert("Please enter all the values");
        return;
      }
    }
  }

  const occurrence = Array(DIM + 1).fill(0);
  let sudokuIsValid = true; // Assume the sudoku is valid initially

  // Check rows
  for (let row_ind = 0; row_ind < DIM; row_ind++) {
    for (let col_ind = 0; col_ind < DIM; col_ind++) {
      occurrence[sudoku[row_ind][col_ind]] += 1;
    }
    for (let ind = 1; ind <= DIM; ind++) {
      occurrence[ind] -= 1;
    }
    for (let ind = 1; ind <= DIM; ind++) {
      if (occurrence[ind] >= 1) {
        alert("ERROR");
        sudokuIsValid = false; // Set to false if an error is found
        return;
      }
    }
  }

  // Check columns
  for (let col_ind = 0; col_ind < DIM; col_ind++) {
    for (let row_ind = 0; row_ind < DIM; row_ind++) {
      occurrence[sudoku[row_ind][col_ind]] += 1;
    }
    for (let ind = 1; ind <= DIM; ind++) {
      occurrence[ind] -= 1;
    }
    for (let ind = 1; ind <= DIM; ind++) {
      if (occurrence[ind] >= 1) {
        alert("ERROR");
        sudokuIsValid = false; // Set to false if an error is found
        return;
      }
    }
  }

  // Check 3x3 subgrids
  for (let startRow = 0; startRow < DIM; startRow += 3) {
    for (let startCol = 0; startCol < DIM; startCol += 3) {
      for (let row_ind = 0; row_ind < 3; row_ind++) {
        for (let col_ind = 0; col_ind < 3; col_ind++) {
          occurrence[sudoku[startRow + row_ind][startCol + col_ind]] += 1;
        }
      }
    }
  }

  for (let ind = 1; ind <= DIM; ind++) {
    occurrence[ind] -= 9;
  }
  for (let ind = 1; ind <= DIM; ind++) {
    if (occurrence[ind] >= 1) {
      alert("ERROR");
      sudokuIsValid = false; // Set to false if an error is found
      return;
    }
  }

  alert(sudokuIsValid ? "The sudoku is perfectly solved" : "Invalid sudoku");
  return;
}
