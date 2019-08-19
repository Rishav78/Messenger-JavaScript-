let activeChat = {};
let userinfo = null;
let socket = io.connect();
let activeChatMember = null;
let typing = false;
let end = false;
let page = 0;
let noOfRecords = parseInt(window.innerHeight / 18);

//append new message
function appendNewMessage(message, user, cb){
    let div = document.createElement('div');
    $(`<div class="sender">
            <span>
                ${user}:
            </span>
        </div>
        <div>
            <span>
                ${message}
            </span>
        </div>`).appendTo(div);
    cb(div);
}

async function getMessages(id){
    await $.post(`/messages`,{
        chatid: id,
        page,
        noOfRecords,
    },function(data, status){
        const {messages} = data;
        if(messages.length === 0){
            end = true;
            return;
        }
        messages.forEach((message) => {
            let msg = message.message, user = message.sender.firstName + ' ' + message.sender.lastName;
            appendNewMessage(msg, user, (div) => $('.messageHistory').prepend(div))
        });
    });
}

//append new chat to the screen
function appendNewChat(chat){
    let div = document.createElement('div');
    let name = chat.chatMembers.filter((member) => {
        return member._id != userinfo.id;
    });

    $(`<div class="dp"> <img src="/download.png" /> </div>
    <div> ${!chat.chatType ? name[0].firstName + ' ' + name[0].lastName : chat.chatName} </div>`)
        .appendTo(div);

    div.onclick = async function(){ 
        if(activeChat.id !== chat._id){
            // uppdate chat info
            activeChat = chat;
            activeChat.receiver = name;
            // update chatscreen header
            console.log(name)
            $('.chatOwner').html(!chat.chatType ? name[0].firstName + ' ' + name[0].lastName : chat.chatName);
            name.length === 1 && name[0].status === 1 ? $('.online').addClass('show') : $('.online').removeClass('show');


            // animation
            $('.selectedChat').removeClass('selectedChat');
            $(div).addClass('selectedChat');

            // empty message box
            $('.messageHistory').empty();

            //get messages
            await getMessages(chat._id);
            $('.messageHistory').scrollTop($('.messageHistory')[0].scrollHeight);
        }
    }

    return $('.ongoingchats').append(div);
}



//get and append login user info
$(document).ready(async function(){
    await $.get('/logeduserinfo',function(data,status){
        userinfo = {
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
        };
        socket.emit('new connection',{id: userinfo.id});
        socket.on('new message',(data)=>{
            let msg = data.message, user = data.userinfo.firstName + ' ' + data.userinfo.lastName;
            data.chatID === activeChat._id && appendNewMessage(msg, user, (div) => $('.messageHistory').append(div));
            $('.messageHistory').scrollTop($('.messageHistory')[0].scrollHeight);

        })
        $(`<span> ${userinfo.firstName} ${userinfo.lastName} </span>`).appendTo('.username');
    });
    await $.get('/ongoingchats', function(chats, status){
        chats.forEach(chat => {
            appendNewChat(chat);
        });
    })
});

// get and append chats

function emitTyping(status){
    return socket.emit('typing', {
        receiver: activeChat.receiver,
        chatID: activeChat._id,
        userinfo,
        status,
    })
}

//listen for input change
$(document).ready(function(){     
    $('input').keydown(function(e){
        !typing && emitTyping(1) && (typing = !typing);

        e.keyCode === 13 && $(this).val() && socket.emit('new message',{
            message: $(this).val(),
            members: activeChat.chatMembers,
            chatID: activeChat._id,
            userinfo,
        }) && $(this).val('') && emitTyping(0) && (typing = !typing);
        
    });

    $('input').blur(function(){
        emitTyping(0);
        typing = !typing;
    })
})

$('.messageHistory').scroll(function(){
    if(!end && $('.messageHistory').scrollTop() === 0){
        page++;
        getMessages(activeChat._id);
        $('.messageHistory').scrollTop(30);
    }
})

socket.on('online', function(data){
    if(activeChat.chatType === 0 && activeChat.receiver &&  data.user === activeChat.receiver[0]._id){
        data.status === 1 ? $('.online').addClass('show') : $('.online').removeClass('show');
    }else{
        console.log('nope')
    }
})

socket.on('typing', function(data){
    console.log(data)
    data.chatID === activeChat._id && data.status === 1 ? $('.online').removeClass('show') && $('.typing').addClass('show') : $('.typing').removeClass('show') && $('.online').addClass('show');
})