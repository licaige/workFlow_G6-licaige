class Solution {
    public int countPalindromicSubsequence(String s) {
        char[] letters = new char[]{'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                                    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 
                                    'w', 'x', 'y', 'z'};
        Set<Character> left = new HashSet<>();
        Map<Character, Integer> right = new HashMap<>();
        for(char c : s.toCharArray()) {
            right.put(c, right.getOrDefault(c, 0) + 1);
        }
        Set<String> res = new HashSet<>();

        for(int mid = 0; mid < s.length(); mid++) {
            char c = s.charAt(mid);
            
            right.put(c, right.get(c)-1);
            if(right.get(c) == 0) {
                right.remove(c);
            }

            for(int i=0; i<26; i++) {
                if(left.contains(letters[i]) && right.containsKey(letters[i])) {
                    res.add("" + letters[i] + c + letters[i]);
                }
            }

            left.add(c);
        }

        return res.size();
    }
}
/*                 Alternative solution
------------------------------------------------------------------------*/
class Solution {
    public int countPalindromicSubsequence(String s) {
        Map<Character, Integer> map = new HashMap<>();
        for(char c: s.toCharArray())
            map.put(c, map.getOrDefault(c, 0) + 1);

        int res = 0;
        for(char c : map.keySet()){
            if (map.get(c) >= 2){
                int fo = s.indexOf(c), lo = s.lastIndexOf(c);
                Set<Character> between = new HashSet<>();
                for(int i = fo+1; i < lo; i++)
                    between.add(s.charAt(i));
                res += between.size();    
            }
        }
        return res; 
    }
}
