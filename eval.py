from tokenizers import ByteLevelBPETokenizer
from transformers import GPT2Config, GPT2LMHeadModel, GPT2Tokenizer, DataCollatorForLanguageModeling
from datasets import load_dataset
from transformers import Trainer, TrainingArguments

TRAIN = False
paths = ["text.txt"]


if TRAIN:
    tokenizer = ByteLevelBPETokenizer()
    tokenizer.train(files=paths, vocab_size=52000, min_frequency=2, special_tokens=[
        "<s>",
        "<pad>",
        "</s>",
        "<unk>",
        "<mask>",
    ])
    tokenizer.save_model("tokenizer")

tokenizer = GPT2Tokenizer.from_pretrained('tokenizer')
tokenizer.add_special_tokens({
    "eos_token": "</s>",
    "bos_token": "<s>",
    "unk_token": "<unk>",
    "pad_token": "<pad>",
    "mask_token": "<mask>",
})


config = GPT2Config(
    vocab_size=tokenizer.vocab_size,
    bos_token = tokenizer.bos_token_id,
    eos_token= tokenizer.eos_token_id
)

model = GPT2LMHeadModel.from_pretrained("wow")
while True:
    inp = input(">> ")
    inp = tokenizer.encode(inp, return_tensors="pt")
    beam_output = model.generate(inp,
    max_length=512,
    num_beams=10,
    temperature=0.7,
    no_repeat_ngram_size=5 # Avoid repeat
    num_return_sequences=1
    )
    for beam in beam_output:
        out = tokenizer.decode(beam)
        fout = out.replace("<N>", "\n")
        print(str(fout))