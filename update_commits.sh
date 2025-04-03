#!/bin/bash

# Get the co-author text
COAUTHORS=$(cat update_commit_template.txt)

# Function to update a commit message
update_commit() {
  COMMIT=$1
  MESSAGE=$(git log --format=%B -n 1 "$COMMIT")

  # Check if the commit already has co-authors
  if [[ "$MESSAGE" != *"Co-authored-by:"* ]]; then
    # Create a temporary file with the new commit message
    echo -e "${MESSAGE}\n${COAUTHORS}" > temp_commit_msg.txt

    # Amend the commit with the new message
    git filter-branch --force --msg-filter 'cat temp_commit_msg.txt' -- "$COMMIT^...$COMMIT"

    # Clean up
    rm temp_commit_msg.txt
  fi
}

# Update each commit
update_commit "bef3cc4"
update_commit "d139252"
update_commit "71847ab"

echo "Commits updated with co-authors."
