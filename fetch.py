from github import Github
import os


token = "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"
gh = Github(token)

query = "topic:solana language:javascript, rust"
result = gh.search_repositories(query)

for item in result:
    print(item.clone_url)
    try:
        os.system(f"git clone {item.clone_url} repos/{item.owner.login}/{item.name}")
    except:
        print("Skipping: ", item.name)
        continue