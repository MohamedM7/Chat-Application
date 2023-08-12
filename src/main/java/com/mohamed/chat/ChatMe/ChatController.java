package com.mohamed.chat.ChatMe;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/ChatMe.SendMessage")
    @SendTo("/topic/public") // each time the message is payload it will be sent to topic/public
    public ChatMessage SendMessage(@Payload ChatMessage chatMessage ){
      return chatMessage;

    }

    @MessageMapping("/ChatMe.AddUser")
    @SendTo("/topic/public")
    public ChatMessage AddUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("UserName",chatMessage.getSender());//Add username in websocket session
        return chatMessage;

    }




}
