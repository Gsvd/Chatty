<template>
  <div id="app">
    <div class="container">
      <div class="title">
        CHATTY
      </div>
      <div class="box">
        <div class="messages">
          <div class="message" v-for="(msg, index) in messages" v-bind:key="index">{{ msg.message }}</div>
        </div>
        <div class="input">
          <div class="text">
            <textarea name="content" id="content" v-model="message" @keydown.enter.exact.prevent @keyup.enter="sendMessage()"></textarea>
          </div>
          <div class="submit" @click="sendMessage()">
            <i class="far fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'app',
  mounted () {
    this.socket.on('MESSAGE', (data) => {
      this.messages.unshift(data)
    }),
    this.socket.on('WELCOME', (data) => {
      this.user = data.user
    })
  },
  data: () => ({
    user: '',
    messages: [],
    message: '',
    socket: io('10.10.16.111:3000')
  }),
  methods: {
    sendMessage() {
      if (this.message.length > 0) {
        this.socket.emit('SEND_MESSAGE', {
          user: this.user,
          message: this.message
        })
        this.message = ''
      }
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Roboto";
  src: url("assets/fonts/Roboto-Regular.ttf");
}
@font-face {
  font-family: "Roboto-Bold";
  src: url("assets/fonts/Roboto-Bold.ttf");
}
@font-face {
  font-family: "Roboto-Thin";
  src: url("assets/fonts/Roboto-Thin.ttf");
}
@font-face {
  font-family: "Roboto-Light";
  src: url("assets/fonts/Roboto-Light.ttf");
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .container {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-family: "Roboto-Thin";
      font-size: 45px;
      letter-spacing: 2px;
      margin-bottom: 25px;
    }

    .box {
      display: flex;
      flex-direction: column;
      height: 60vh;
      width: 580px;
      border: 1px rgb(235, 235, 235) solid;
      border-radius: 2px;

      .messages {
        word-wrap: break-word;
        display: flex;
        flex-direction: column-reverse;
        flex-grow: 1;
        overflow-y: auto;

        .message {
          font-family: "Roboto";
          font-size: 13px;
          padding: 5px;
          border-top: 1px rgb(235, 235, 235) solid;
        }
      }

      .input {
        display: flex;
        flex-direction: row;
        min-height: 60px;
        border-top: 1px rgb(235, 235, 235) solid;

        .text {
          flex-grow: 9;
          text-align: center;

          textarea {
            resize: none;
            outline: none;
            width: 98%;
            height: 54px;
            border: none;
          }
        }

        .submit {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          cursor: pointer;
          border-left: 1px rgb(235, 235, 235) solid;
        }
      }
    }
  }
}
</style>
