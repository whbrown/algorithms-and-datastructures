pub mod recursion;
pub mod search;
pub mod simple_challenges;
pub mod sort;

#[cfg(test)]
mod tests {
    mod simple_challenges {
        use crate::simple_challenges::*;

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
            assert_eq!(is_valid_anagram("", " "), false);
            assert_eq!(is_valid_anagram("texttwisttime", "timetwisttext"), true);
        }

        #[test]
        fn test_sum_zero() {
            assert_eq!(sum_zero(&vec![-3, -2, -1, 0, 1, 2, 3]), Some((-3, 3)));
            assert_eq!(sum_zero(&vec![-2, 0, 1, 3]), None);
            assert_eq!(sum_zero(&vec![-3, -2, 0, 1]), None);
            assert_eq!(sum_zero(&vec![1, 2, 3]), None);
            assert_eq!(sum_zero(&vec![]), None);
            assert_eq!(sum_zero(&vec![1]), None);
            assert_eq!(sum_zero(&vec![-1, 1]), Some((-1, 1)));
        }

        #[test]
        fn test_count_uniques() {
            assert_eq!(count_uniques(&vec![-3, -2, -1, 0, 1, 2, 3]), 7);
            assert_eq!(count_uniques(&vec![-3, -3, -1, 0, 1, 2, 3]), 6);
            assert_eq!(count_uniques(&vec![-3, -3, -1, 0, 1, 2, 2]), 5);
            assert_eq!(count_uniques(&vec![-3]), 1);
            assert_eq!(count_uniques(&vec![]), 0);
        }

        #[test]
        fn test_sum_nums() {
            assert_eq!(sum_nums(&[1, 2, 3]), 6)
        }

        #[test]
        fn test_max_n_width_sub_array() {
            assert_eq!(
                max_n_width_sub_array_sum(&[1, 2, 5, 2, 8, 1, 5], 2),
                Some(10)
            );
            assert_eq!(
                max_n_width_sub_array_sum(&[1, 2, 5, 2, 8, 1, 5], 4),
                Some(17)
            );
            assert_eq!(max_n_width_sub_array_sum(&[4, 2, 1, 6], 1), Some(6));
            assert_eq!(max_n_width_sub_array_sum(&[4, 2, 1, 6, 2], 4), Some(13));
            assert_eq!(max_n_width_sub_array_sum(&[], 4), None);
        }
    }

    mod recursion {
        use crate::recursion::*;
        #[test]
        fn test_power() {
            assert_eq!(power(2, 2), 2_usize.pow(2));
            assert_eq!(power(6, 1), 6_usize.pow(1));
            assert_eq!(power(2, 8), 2_usize.pow(8));
            assert_eq!(power(0, 2), 0_usize.pow(2));
            assert_eq!(power(2, 0), 2_usize.pow(0));
        }

        #[test]
        fn test_factorial() {
            assert_eq!(factorial(3), 3 * 2 * 1);
            assert_eq!(factorial(5), 5 * 4 * 3 * 2 * 1);
            assert_eq!(factorial(1), 1);
            assert_eq!(factorial(0), 1);
        }

        #[test]
        fn test_product_of_nums() {
            assert_eq!(product_of_nums(&[1, 2, 3]), Some(1 * 2 * 3));
            assert_eq!(product_of_nums(&[1, -2, 3]), Some(1 * -2 * 3));
            assert_eq!(product_of_nums(&[1, -2, 0]), Some(1 * -2 * 0));
            assert_eq!(product_of_nums(&[]), None);
        }

        #[test]
        fn test_sum_up_to() {
            assert_eq!(sum_up_to(5), 0 + 1 + 2 + 3 + 4 + 5);
            assert_eq!(sum_up_to(1), 0 + 1);
            assert_eq!(sum_up_to(0), 0);
        }

        #[test]
        fn test_fibonacci() {
            assert_eq!(fibonacci(4), 3);
            assert_eq!(fibonacci(10), 55);
            assert_eq!(fibonacci(28), 317811);
            assert_eq!(fibonacci(35), 9227465);
        }

        #[test]
        fn test_reverse() {
            assert_eq!(reverse("abcdef"), "fedcba");
            assert_eq!(reverse("test"), "tset");
            assert_eq!(reverse(""), "");
        }
    }

    mod search {
        use crate::search::*;

        #[test]
        fn test_linear_search() {
            assert_eq!(linear_search(&[7, 4, 3, 1, 5], 3), 2);
            assert_eq!(linear_search(&[5, 3, 2, 3, 4, 5], 6), -1);
            assert_eq!(linear_search(&[], 6), -1);
        }

        #[test]
        fn test_binary_search_nums() {
            assert_eq!(binary_search_nums(&[1, 2, 3, 4, 5], 1), 0);
            assert_eq!(binary_search_nums(&[1, 2, 3, 3, 4, 5], 6), -1);
            assert_eq!(binary_search_nums(&[3, 3, 3, 4, 5, 5, 6], 6), 6);
            assert_eq!(binary_search_nums(&[3, 3, 3, 4, 5, 5, 5, 6], 6), 7);
            assert_eq!(binary_search_nums(&[], 6), -1);
        }
    }

    mod sort {
        use crate::sort::*;

        #[test]
        fn test_bubble_sort() {
            assert_eq!(
                bubble_sort(&mut [29, 10, 14, 30, 37, 14, 18]),
                [10, 14, 14, 18, 29, 30, 37]
            );
            assert_eq!(bubble_sort(&mut []), []);
            assert_eq!(bubble_sort(&mut [1, 1, 1, 2, 1]), [1, 1, 1, 1, 2]);
            assert_eq!(bubble_sort(&mut [2, 1, 1, 1, 2]), [1, 1, 1, 2, 2]);
            assert_eq!(bubble_sort(&mut [1]), [1]);
        }

        #[test]
        fn test_selection_sort() {
            assert_eq!(
                selection_sort(&mut [29, 10, 14, 30, 37, 14, 18]),
                [10, 14, 14, 18, 29, 30, 37]
            );
            assert_eq!(selection_sort(&mut []), []);
            assert_eq!(selection_sort(&mut [1, 1, 1, 2, 1]), [1, 1, 1, 1, 2]);
            assert_eq!(selection_sort(&mut [2, 1, 1, 1, 2]), [1, 1, 1, 2, 2]);
            assert_eq!(selection_sort(&mut [1]), [1]);
        }

        #[test]
        fn test_insertion_sort() {
            assert_eq!(
                insertion_sort(&mut [29, 10, 14, 30, 37, 14, 18]),
                [10, 14, 14, 18, 29, 30, 37]
            );
            assert_eq!(insertion_sort(&mut []), []);
            assert_eq!(insertion_sort(&mut [1, 1, 1, 2, 1]), [1, 1, 1, 1, 2]);
            assert_eq!(insertion_sort(&mut [2, 1, 1, 1, 2]), [1, 1, 1, 2, 2]);
            assert_eq!(insertion_sort(&mut [1]), [1]);
        }

        #[test]
        fn test_merge() {
            assert_eq!(merge(&[1, 2, 3], &[4, 5, 6]), vec![1, 2, 3, 4, 5, 6]);
            assert_eq!(merge(&[], &[]), vec![]);
            assert_eq!(merge(&[1, 3, 5], &[2, 4, 6]), vec![1, 2, 3, 4, 5, 6]);
        }
    }
}
