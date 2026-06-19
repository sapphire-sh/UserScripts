# UserScripts

- When writing GitHub content (issue/comment/PR) about `twitter-username-sanitizer`, any username presented as a bug repro case is PII — replace it with a generic descriptor (e.g. "a Mathematical Script styled username"), never paste the real or visually-transformed username verbatim. The sanitizer scripts inherently take real usernames as input, so repro cases in this repo routinely carry recoverable PII.
