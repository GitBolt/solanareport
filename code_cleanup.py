import os
import time

MAX_CHAR_LENGTH = 512
MIN_CHAR_LENGTH = 250
NEWLINE_CHAR = "<N>"

full_paths = []


for dirpath, dirnames, filenames in os.walk("repos"):
    for f in filenames:
        full_path = os.path.join(dirpath, f)
        full_paths.append(full_path)

print(len(full_path))

with open ("text.txt", "a") as f:
    for fpath in full_paths:
        try:
            d = open(fpath, "r").read()
            fd = d.replace("\n", NEWLINE_CHAR)

            if 100 < len(d) <= MAX_CHAR_LENGTH:
                f.write(fd+"\n")
            else:
                sd = fd.split(f"{NEWLINE_CHAR}{NEWLINE_CHAR}")
                substring = ""
                for split in sd:
                    substring += split + f"{NEWLINE_CHAR}{NEWLINE_CHAR}"
                    if MIN_CHAR_LENGTH <= len(substring) <= MAX_CHAR_LENGTH:
                        f.write(substring + "\n")
                        substring = ""
        except Exception as e:
            print(str(e))

            