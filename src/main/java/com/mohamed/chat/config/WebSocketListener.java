package com.mohamed.chat.config;

import com.mohamed.chat.ChatMe.ChatMessage;
import com.mohamed.chat.ChatMe.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketListener {
    private final SimpMessageSendingOperations message_template;
    @EventListener
    public void WebSocketDisconnectListener(SessionDisconnectEvent event){
        StompHeaderAccessor headerAccessor=StompHeaderAccessor.wrap(event.getMessage());// wrapping the event
        String UserName= (String) headerAccessor.getSessionAttributes().get("UserName");
        if(UserName !=null){
            log.info("User Disconnect {}",UserName);
             var chatMessage = ChatMessage.builder()  // Chat information's
                     .message_type(MessageType.LEAVE)
                     .sender(UserName)
                     .build();
             message_template.convertAndSend("/topic/public",chatMessage); // the channel were everyone pass through
        }

    }


}
