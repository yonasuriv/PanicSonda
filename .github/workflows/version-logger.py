import re
import subprocess
from pathlib import Path
from datetime import datetime

# Paths
version_file_path = Path('.github/meta/current.version')
update_file_path = Path('.github/logs/CHANGELOG.md')
change_log_file_path = Path('.github/logs/changes/updates.log')
ninja_log_file_path = Path('.github/logs/changes/tweaks.log')

# Directories to check for changes
excluded_dirs = ['.github']

def changes_outside_excluded_dirs():
    # Get the list of modified files
    result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
    modified_files = [line[3:] for line in result.stdout.splitlines() if line.startswith(' M') or line.startswith('??')]

    # Check if there are any modified files outside the excluded directories
    changes_in_excluded_dirs = 0
    for file in modified_files:
        if any(file.startswith(dir) for dir in excluded_dirs):
            changes_in_excluded_dirs += 1
        else:
            return True

    # If all changes are in excluded directories, return False
    return changes_in_excluded_dirs == 0

# Proceed only if there are changes outside the excluded directories
if changes_outside_excluded_dirs():
    # Read the VERSION file
    with version_file_path.open() as f:
        version_line = f.readline().strip()
        print(f"Read VERSION line: {version_line}")  # Debugging output
        version_match = re.search(r'VERSION=(\d+)\.(\d+)\.(\d+)', version_line)
        if not version_match:
            raise ValueError("VERSION file format is incorrect.")
        major, minor, patch = map(int, version_match.groups())

    # Read the UPDATE file and find the TYPE line
    type = None
    with update_file_path.open() as f:
        for line in f:
            line = line.strip()
            if line.startswith("TYPE="):
                print(f"Read UPDATE line: {line}")  # Debugging output
                update_match = re.search(r'TYPE="?(\w+)"?', line, re.IGNORECASE)
                if update_match:
                    type = update_match.group(1).capitalize()
                    break

    if not type:
        raise ValueError("TYPE format is incorrect or not found.")

    print(f"Parsed update type: {type}")  # Debugging output

    # Update the version based on type
    if type == 'Major':
        major += 1
        minor = 0
        patch = 0
    elif type == 'Minor':
        minor += 1
        patch = 0
    elif type == 'Patch':
        patch += 1
    elif type == 'Ninja':
        pass
    else:
        raise ValueError("Invalid TYPE value.")

    # Write the new version to the VERSION file
    new_version = f'VERSION={major}.{minor}.{patch}\n'
    with version_file_path.open('w') as f:
        f.write(new_version)
    print(f"Updated version to: {new_version.strip()}")  # Debugging output

    # Get the last commit details
    commit_hash = subprocess.check_output(['git', 'rev-parse', 'HEAD']).strip().decode()
    commit_message = subprocess.check_output(['git', 'log', '-1', '--pretty=%B']).strip().decode()
    author_name = subprocess.check_output(['git', 'log', '-1', '--pretty=%an']).strip().decode()
    author_email = subprocess.check_output(['git', 'log', '-1', '--pretty=%ae']).strip().decode()
    commit_date = subprocess.check_output(['git', 'log', '-1', '--pretty=%ad']).strip().decode()

    # Convert commit date to desired format
    commit_datetime = datetime.strptime(commit_date, '%a %b %d %H:%M:%S %Y %z')
    formatted_date = commit_datetime.strftime('%B %d, %Y, at %H:%M (UTC%z)')
    date_version = commit_datetime.strftime('%d.%m.%y')

    # Prepare the log entry if author is not github-actions[bot]
    if author_name != 'github-actions[bot]':
        new_log_entry = [
            f"Update: {commit_message}\n",
            f"Version: {type} {major}.{minor}.{patch}-{date_version}\n",
            f"Commit: {commit_hash}\n",
            f"Author: {author_name} on {formatted_date}\n",
            "\n"
        ]

        # Determine which log file to use based on the update type
        log_file_path = ninja_log_file_path if type == 'Ninja' else change_log_file_path

        # Update the appropriate log file
        if log_file_path.exists():
            log_content = log_file_path.read_text().splitlines(keepends=True)
            log_content = log_content[:2] + new_log_entry + log_content[2:]
            log_file_path.write_text(''.join(log_content))
        else:
            log_file_path.write_text(''.join(new_log_entry))
        print(f"Appended new log entry to the {'ninja.log' if type == 'Ninja' else 'change.log'}")  # Debugging output
    else:
        print("Skipping logging for commit by github-actions[bot]")

    # Update TYPE to Ninja
    with update_file_path.open('r+') as f:
        content = f.read()
        content = re.sub(r'TYPE=\w+', 'TYPE=Ninja', content, flags=re.IGNORECASE)
        f.seek(0)
        f.write(content)
        f.truncate()
    print(f"Updated TYPE to Ninja")  # Debugging output

    # Add, commit, and push changes
    commit_message = f"Version {major}.{minor}.{patch} {type} update"
    print("Running git add...")
    subprocess.run(['git', 'add', '--all'])
    print("Running git commit...")
    commit_result = subprocess.run(['git', 'commit', '-m', commit_message])
    print(f"Git commit result: {commit_result.returncode}")
    print("Running git push...")
    push_result = subprocess.run(['git', 'push'])
    print(f"Git push result: {push_result.returncode}")
else:
    print("No changes outside the excluded directories. Skipping version update and logging.")
