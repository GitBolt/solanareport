import os

for dirpath, dirnames, filenames in os.walk("repos"):
    for f in filenames:
        full_path = os.path.join(dirpath, f)
        if full_path.endswith((".js", ".ts", ".rs")):
            print(f"Keeping {full_path}")
        else:
            print(f"Removing {full_path}")
            os.remove(full_path)