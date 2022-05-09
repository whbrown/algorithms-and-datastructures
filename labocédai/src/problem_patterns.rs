use std::collections::HashMap;

pub fn is_valid_anagram(string_1: &str, string_2: &str) -> bool {
    if string_1.len() != string_2.len() {
        return false;
    }
    let mut freq_counter = string_1
        .chars()
        .fold(HashMap::new(), |mut freq_counter, c| {
            *freq_counter.entry(c.to_string()).or_insert(0) += 1;
            freq_counter
        });
    for c in string_2.chars() {
        let count = freq_counter.entry(c.to_string()).or_insert(0);
        *count -= 1;
        if count < &mut 0 {
            return false;
        }
    }

    return true;
}
