package com.mohamed.chat.ChatMe;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private String message;
    private String sender;
    private MessageType message_type;


}
