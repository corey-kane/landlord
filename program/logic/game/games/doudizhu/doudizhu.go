package doudizhu

import (
	"chessSever/program/logic/game/games"
	"math/rand"
	"time"
	"chessSever/program/logic/game/poker"
	"chessSever/program/logic/player"
)

type Doudizhu struct {
	id int
	name string                           //游戏名称
	playerNum int						  //玩家数
	deckNum int                           //几副牌
	pokerCards []*poker.PokerCard         //当前游戏中的所有的牌
	lastCards []*poker.PokerCard          //最后一次出的牌
	currMulti int                         //当前倍率
	lordIndex int                         //地主索引
	lastThreeCards  []*poker.PokerCard    //最后三张底牌
}

func GetDoudizhu() games.Game{
	dou := Doudizhu{
		id:1,
		name:"斗地主",
		playerNum:3,
		deckNum:1,
		pokerCards:[]*poker.PokerCard{},
		lastCards:[]*poker.PokerCard{},
	}
	dou.initCards()
	return dou
}


func (dou Doudizhu)GetPlayerNum() int{
	return dou.playerNum
}

func (dou Doudizhu)GetPokerCards() []*poker.PokerCard{
	return dou.pokerCards
}

func (dou Doudizhu)GetGameName() string{
	return dou.name
}

func (dou Doudizhu)GetGameID() int{
	return dou.id
}

func (dou Doudizhu)GetDeckNum() int{
	return dou.deckNum
}

func (dou Doudizhu)GetLastCards() []*poker.PokerCard{
	return dou.lastCards
}

//初始化游戏中的牌
func (dou Doudizhu)initCards(){
	for i:=0;i<dou.playerNum;i++{
		deck := poker.CreateDeck()
		for _,card := range deck.Cards{
			dou.pokerCards = append(dou.pokerCards,card)
		}
	}
}

//洗牌
func (dou Doudizhu)shuffleCards(){
	rand.Seed(time.Now().Unix())
	for i := len(dou.pokerCards) - 1; i > 0; i-- {
		num := rand.Intn(i + 1)
		dou.pokerCards[i], dou.pokerCards[num] = dou.pokerCards[num], dou.pokerCards[i]
	}
}

//发牌
func (dou Doudizhu)DealCards(table *player.Table){
	players := make([]*player.Player,dou.GetPlayerNum())
	for _,player := range table.Players{
		players = append(players,player)
	}
	
	dou.shuffleCards()
	for i:=0; i<len(dou.pokerCards);i++  {
		yu := i%dou.playerNum
		players[yu-1].PokerCards = append(players[yu-1].PokerCards,dou.pokerCards[i])
	}
}

func (dou Doudizhu)Hint() []*poker.PokerCard{
	return []*poker.PokerCard{}
}

func (dou Doudizhu)CompareCards(cardsNow []poker.PokerDeck,lastCards []poker.PokerCard) bool{
	return false
}

func (dou Doudizhu)IsMatchRoles() bool{
	return false
}
