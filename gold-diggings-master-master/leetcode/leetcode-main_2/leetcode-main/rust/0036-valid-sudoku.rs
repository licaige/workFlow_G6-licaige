use std::collections::HashSet;


impl Solution {
    pub fn is_valid_sudoku(board: Vec<Vec<char>>) -> bool {
        
       let mut row: HashSet<char> = HashSet::new();
       let mut col: HashSet<char> = HashSet::new();
       let mut bx : HashSet<char> = HashSet::new();
        
        for i in 0..9{
            for j in 0..9{
                let r = board[i][j];
                let c = board[j][i];
                let b = board[i / 3 * 3 + j / 3][i % 3 * 3 + j % 3];
                
                if r != '.'{
                    if !row.insert(r){
                        return false;
                    }
                }
                
                if c != '.'{
                    if !col.insert(c){
                        return false;
                    }
                }
                
                if b != '.'{
                    if !bx.insert(b){
                        return false;
                    }
                }
            }
            
            row.clear();
            col.clear();
            bx.clear();
        }
        
        true
    }
}