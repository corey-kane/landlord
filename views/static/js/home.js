const MSG_TYPE_OF_READY = 0;    //准备
const MSG_TYPE_OF_UN_READY =1;	 	  //取消准备
const MSG_TYPE_OF_JOIN_TABLE	= 2;      //加入桌子
const MSG_TYPE_OF_LEAVE_TABLE = 3;    //离开桌子
const MSG_TYPE_OF_HINT       =  4;     //提示
const MSG_TYPE_OF_PLAY_CARD   =  5;  //出牌
const MSG_TYPE_OF_PASS       =  6;  //过牌
const MSG_TYPE_OF_AUTO		= 7;  //托管
const MSG_TYPE_OF_SEND_CARD	= 8;  //发牌
const MSG_TYPE_OF_CALL_SCORE   = 9;  //抢地主叫分
const MSG_TYPE_OF_CONFIRM   = 10;   //客户端出牌等操作确认信息
const MSG_TYPE_OF_CALL_SCORE_TIME_OUT = 11; //叫地主超时
const MSG_TYPE_OF_PLAY_ERROR = 12          //出牌错误
const TYPE_OF_PLAY_CARD_SUCCESS  = 13      //出牌成功
const TYPE_OF_TABLE_BRODCAST = 14          //游戏桌子广播消息
var ws;

function print(message) {
    var d = document.createElement("div");
    d.innerHTML = message;
    $("#output").append(d);
};

function openConnection(){
        if (ws) {
            return false;
        }
        ws = new WebSocket("ws://localhost:8888/echo");
        ws.onopen = function(evt) {
            print("OPEN");
        }
        ws.onclose = function(evt) {
            print("CLOSE");
            ws = null;
        }
        ws.onmessage = function(evt) {

            data = JSON.parse(evt.data)
            switch(data.MsgType){
                case MSG_TYPE_OF_READY:
                    break;
                case MSG_TYPE_OF_UN_READY:
                    break;
                case MSG_TYPE_OF_JOIN_TABLE:
                    break;
                case MSG_TYPE_OF_LEAVE_TABLE:
                    break;
                case MSG_TYPE_OF_HINT:
                    break;
                case MSG_TYPE_OF_PLAY_CARD:
                    $("#divPlay").show();
                    break;
                case MSG_TYPE_OF_PASS:
                    break;
                case MSG_TYPE_OF_AUTO:
                    break;
                case MSG_TYPE_OF_SEND_CARD:
                    $("#userCards").html('');
                    $.each(data.Cards,function(i,o){
                        $("#userCards").append(String.format($("#tempCard").html(),o.Card.CardName,o.Card.CardSuit,o.Index));
                    })
                    break;
                case MSG_TYPE_OF_CALL_SCORE:
                    $("#divScore").show()
                    print("请叫分");
                    break;
                case MSG_TYPE_OF_CONFIRM:
                    break;
                case MSG_TYPE_OF_CALL_SCORE_TIME_OUT:
                    $("#divScore").hide();
                    break;
                case MSG_TYPE_OF_PLAY_ERROR:
                    alert(data.Msg);
                    break;
                case TYPE_OF_PLAY_CARD_SUCCESS:
                    $("#divPlay").hide()
                    break;
                case TYPE_OF_TABLE_BRODCAST:
                    break;
                default:
                    console.log(evt.data)
            }
        }
        ws.onerror = function(evt) {
            print("ERROR: " + evt.data);
        }
}


function closeConnection() {
    if (!ws) {
        return false;
    }
    ws.close();
}

function send(evt) {
    if (!ws) {
        return false;
    }
    ws.send(input.value);
}

function ready() {
    var readyMsg = {}
    readyMsg.MsgType = MSG_TYPE_OF_READY;
    ws.send(JSON.stringify(readyMsg));
}

function unReady(){
    
}

function chooseCard(obj){
    if($(obj).hasClass('chooseYes')){
        $(obj).removeClass('chooseYes');
    }else{
        $(obj).addClass('chooseYes');
    }
}

function sendScore() {
    msg = {};
    msg.MsgType = MSG_TYPE_OF_CALL_SCORE;
    msg.Data = {
        "Score":$("#score").val()
    }
    if(!ws){
        return false
    }
    ws.send(JSON.stringify(msg));
    $("#divScore").hide();
}

function pass(){
    $("#divPlay").show();
    msg = {};
    msg.MsgType = MSG_TYPE_OF_PASS;
    ws.send(JSON.stringify(msg));
}

function playCards(){
    $("#divPlay").show();
    msg = {};
    msg.MsgType = MSG_TYPE_OF_PLAY_CARD;
    cardIndex = [];
    $("#userCards").find('div').each(function(i,o){
        if($(o).hasClass('chooseYes')){
             cardIndex.push($($(o).find('input')[0]).val());
        }
    })
    if(cardIndex.length == 0){
        alert('请选择牌，再点击出牌');
    }
    msg.Data = {
        'CardIndex':cardIndex
    }
    ws.send(JSON.stringify(msg));
}

function cardHints(){
    $("#divPlay").show();
    msg = {};
    msg.MsgType = MSG_TYPE_OF_HINT;
    ws.send(JSON.stringify(msg));
}