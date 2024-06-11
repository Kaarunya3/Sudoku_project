function solveSudoku() 
{
    const DIM = 9;
    var sudoku =[];  
    for (let i = 0; i < DIM; i++) 
    {
      sudoku[i] = [];
      for (let j = 0; j < DIM; j++) 
      {
        const cellValue = document.getElementById(`${i+1},${j+1}`).value;
        sudoku[i][j] = parseInt(cellValue)||'0'; // Convert to integer or use 0 if not a valid number
      }
    }
    for(let i=0;i<DIM;i++)
    {
      for(let j=0;j<DIM;j++)
      {
        if(sudoku[i][j])
        {
          alert("You have already entered all the values");
          return;
        }
      }
    }
    let row;
    let col;
    let solver=[];
    for (row=0; row<DIM; row++)
    {
        solver[row]=[];
        for (col=0; col<DIM ;col++)
        {
            solver[row][col]=sudoku[row][col];
        }
    } 
    sudoku_helper(sudoku,solver,0,0);   
    return;
}

function sudoku_helper(sudoku,solver,x,y) 
{
    const DIM=9;
    let wr=x;
    let wc=y;
    let flag=0;
    if(wc==DIM)
    {
        wc=0;
        wr+=1;
        if(wr==DIM)
        {
            printSudoku(solver);
            flag=1;
            return;
        }
    }
    if(sudoku[wr][wc]!=0)
    {
        sudoku_helper(sudoku,solver,wr,wc+1);
    }
    else
    {
        let value;
        for(value=1;value<10 && flag==0;value+=1)
        {
            if(isSafe(solver,wr,wc,value)==SAFE)
            {
                solver[wr][wc]=value;
                sudoku_helper(sudoku,solver,wr,wc+1);
                solver[wr][wc]=0;
            }
        }
    }
}

function isSafe(solver,row,col,val)
{  
    const SAFE=true;
    const UNSAFE=false;
    const DIM=9;
    let wr;
    let wc;
    for(wr=0;wr<DIM;wr+=1)
    {
        if(solver[wr][col]==val)
            return UNSAFE;
    }
    for(wc=0;wc<DIM;wc+=1)
    {
        if(sol[row][wc]==val)
            return UNSAFE;
    }
    let r=row-(row%3);
    let c=col-(col%3);
    for(wr=r;wr<r+3;wr+=1)
    {
        for(wc=c;wc<c+3;wc+=1)
        {
            if(solver[wr][wc]==val)
                return UNSAFE;
        }
    }
    return SAFE;
}
function printSudoku(solved)
{
    const DIM=9;
    for(let i=0;i<DIM;i++)
    {
        for(let j=0;j<DIM;j++)
        {
            document.getElementById(`${i+1},${j+1}`).value=solved[i][j];
        }
    }
}
