<template>
    <div id="app" class="flex flex-column">
        <link rel="stylesheet" href="//cdn.rawgit.com/feathersjs/feathers-chat/v0.2.0/public/base.css">
        <link rel="stylesheet" href="//cdn.rawgit.com/feathersjs/feathers-chat/v0.2.0/public/chat.css">
        <main class="flex flex-column">
            <header class="title-bar flex flex-row flex-center">
                <div class="title-wrapper block center-element">
                    <img class="logo" src="http://feathersjs.com/img/feathers-logo-wide.png" alt="Feathers Logo">
                    <span class="title">Chat</span>
                </div>
            </header>

            <div class="flex flex-row flex-1 clear">
                <div class="flex flex-column col col-12">
                    <main class="chat flex flex-column flex-1 clear">

                        <div class="message flex flex-row" v-for="message in messages">
                            <img src="https://placeimg.com/64/64/any" :alt="message.name" class="avatar">
                            <div class="message-wrapper">
                                <p class="message-header">
                                    <span class="username font-600">{{message.name}}</span>
                                </p>
                                <p class="message-content font-300">{{message.text}}</p>
                            </div>
                        </div>

                    </main>

                    <form class="flex flex-row flex-space-between" id="send-message">
                        <input type="text" placeholder="Your name" name="name" class="col col-3">
                        <input type="text" placeholder="Enter your message" name="text" class="col col-7">
                        <button class="button-primary col col-2" type="submit">Send</button>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import socketio from 'feathers-socketio/client'
import feathers from 'feathers/client'
import io from 'socket.io-client'
const hooks = require('feathers-hooks');

export default {
    data() {
        return {
            messages: []
        }
    },
    mounted() {
        const socket = io('');
        const app = feathers()
            .configure(hooks())
            .configure(socketio(socket));
        // Create the Feathers application with a `socketio` connection
        const messageService = app.service('messages');
        messageService.on('created', message => this.messages.push(message));

        // Use the messages service from the server
        messageService.create({
            text: 'Message from client'
        });

        setInterval(() => {
            messageService.create({
                text: 'Message from client'
            });
        }, 2000)
    }
}
</script>
