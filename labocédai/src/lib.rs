pub mod problem_patterns;
pub mod sum_up_to;

#[cfg(test)]
mod tests {
    use crate::problem_patterns::*;
    use crate::sum_up_to::*;

    #[test]
    fn test_sum_up_to() {
        assert_eq!(sum_up_to(5), 5 + 4 + 3 + 2 + 1);
        assert_eq!(sum_up_to(0), 0);
    }

    #[test]
    fn test_is_valid_anagram() {
        assert_eq!(is_valid_anagram("anagram", "nagaram"), true);
        assert_eq!(is_valid_anagram("rat", "car"), false);
        assert_eq!(is_valid_anagram("", ""), true);
        assert_eq!(is_valid_anagram("texttwisttime", "timetwisttext"), true);
    }
}
