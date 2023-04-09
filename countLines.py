import os

extensions = ['.py', '.js', '.java', '.html', '.css', '.yml', '.sh']  # Add or remove file extensions as needed
total_lines = 0

dir_path = os.path.join('src')

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith(tuple(extensions)):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                file_lines = sum(1 for line in f)
                total_lines += file_lines

print(f"Total lines of code in {dir_path} and its subdirectories: {total_lines}")
