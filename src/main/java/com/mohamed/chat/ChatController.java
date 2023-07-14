package com.mohamed.chat;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/chat.SendMessage")
    @SendTo("/topic/public") // each time the message is payload it will be sent to topic/public
    public ChatMessage SendMessage(@Payload ChatMessage chat_message ){
      return chat_message;
    }

    @MessageMapping("/chat.SendMessage")
    @SendTo("/topic/public")
    public ChatMessage AddUser(ChatMessage chat_message, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username",chat_message.getSender());//Add username in websocket session
        return chat_message;

    }




}
