package main

import (
	"bufio"
	"crypto/sha256"
	"fmt"
	"math/rand"
	"os"
)

type Verify_Blocks struct {
	hashes []string
}
type BlockChain struct {
	blocks []*block
}

type block struct {
	Hash        string
	transaction string
	nonce       int
	PrevHash    string
}

func CalculateHash(stringToHash string) string {
	return fmt.Sprintf("%x", sha256.Sum256([]byte(stringToHash)))
}

func NewBlock(transaction string, nonce int, previousHash string) *block {
	numtostring := string(nonce)
	info := (transaction + numtostring)
	var hash string = ""
	hash = CalculateHash(info)

	b := new(block)

	b.Hash = hash[:]
	b.transaction = transaction
	b.nonce = nonce
	b.PrevHash = previousHash[:]

	return b
}

func (chain *BlockChain) AddBlock(Transaction string) {
	nonce := rand.Intn(200)
	if len(chain.blocks) == 0 {
		string_for_first_block := "Hello! I'll be used for prevhash of 1st block"
		prev_hash_for_first_block := CalculateHash(string_for_first_block)
		new := NewBlock(Transaction, nonce, prev_hash_for_first_block)
		chain.blocks = append(chain.blocks, new)
	} else {
		prevBlock := chain.blocks[len(chain.blocks)-1]
		hash0 := string(prevBlock.Hash)
		new := NewBlock(Transaction, nonce, hash0)
		chain.blocks = append(chain.blocks, new)
	}
}

func main() {
	chain := new(BlockChain)
	HASHES := new(Verify_Blocks)
	chain.AddBlock("Alice To Bob")
	chain.AddBlock("Usama To Fiaz")
	chain.AddBlock("Fiaz To Usama")
	chain.AddBlock("Bob To Alice")
	var total = len(chain.blocks)
	for no := 0; no < total; no++ {
		HASHES.hashes = append(HASHES.hashes, chain.blocks[no].Hash)
	}
	var choice int
	var Bn int
	var trans_user string

	for {
		fmt.Println("\n🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩 M E N U 🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩")
		fmt.Println("1) Display All Blocks")
		fmt.Println("2) Modify a Block's Transaction")
		fmt.Println("3) Verification")
		fmt.Println("4) Add another Block")
		fmt.Println("0) Exit\n[Enter]")
		fmt.Scanln(&choice)
		reader := bufio.NewReader(os.Stdin)
		if choice == 0 {
			break
		} else if choice == 1 {
			fmt.Println("✅")
			chain.DisplayBlocks(chain)
		} else if choice == 2 {
			fmt.Println("✅")
			total := len(chain.blocks)
			fmt.Println("[Enter] Block Number between 1 and  ", total)
			fmt.Scan(&Bn)
			if Bn > 0 && Bn <= total {
				fmt.Println("[Enter] New Transaction : ")
				trans_user, _ = reader.ReadString('\n')
				ChangeBlock(trans_user, chain.blocks[Bn-1])
			} else {
				fmt.Println("❌ Error : Block Number Out of Range")
			}
		} else if choice == 3 {
			fmt.Println("✅")
			VerifyChain(HASHES, chain)
		} else if choice == 4 {
			fmt.Println("✅")
			fmt.Println("[Enter] New Transaction : ")
			trans_user, _ = reader.ReadString('\n')
			chain.AddBlock(trans_user)
			Length := len(chain.blocks)
			HASHES.hashes = append(HASHES.hashes, chain.blocks[Length-1].Hash)
		} else {
			fmt.Println("Please Enter Valid Option Number")
		}
	}
}

func (*BlockChain) DisplayBlocks(chain *BlockChain) {
	fmt.Println("🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩 Displaying Blocks 🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩\n")
	var total = len(chain.blocks)
	for no := 0; no < total; no++ {
		fmt.Println("🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩 Data of Block : ", no+1)
		fmt.Println("Hash of Block : ", chain.blocks[no].Hash)
		fmt.Println("Transaction Data in Block : ", chain.blocks[no].transaction)
		fmt.Println("Nonce of Block : ", chain.blocks[no].nonce)
		fmt.Println("Previous Hash : ", chain.blocks[no].PrevHash, "\n")
	}
}
func ChangeBlock(Modified_Transaction string, b *block) {
	b.transaction = Modified_Transaction //Transaction is changed

	numtostring := string(b.nonce)
	info := (b.transaction + numtostring)
	hash := CalculateHash(info)

	b.Hash = hash[:] //Hash would also be change
}

func VerifyChain(HASHES *Verify_Blocks, chain *BlockChain) {
	var total = len(chain.blocks)
	for no := 0; no < total; no++ {
		if HASHES.hashes[no] != chain.blocks[no].Hash {
			fmt.Println("Changes are made at block no : ", no+1)
		}
	}
}
