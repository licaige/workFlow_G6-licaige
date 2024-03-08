class Solution {
public:
    int guessNumber(int n) {
        int low = 1;
        int high = n;
        
        while(true) {
            int mid = low + (high - low)/2;
            int myGuess = guess(mid);
            if(myGuess == 1)
                low = mid + 1;
            else if(myGuess == -1)
                high = mid - 1;
            else
                return mid;
        }
    }
};
