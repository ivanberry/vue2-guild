Vue.component('my-component', {
    template: '<h2>{{ message }}<h2>',
    data: function () {
        return {
            message: 'hello Vue.js'
        }
    }
});

var dataFunction = new Vue({
    el: '#component-data-function'
});

var data = { counter: 0 };

Vue.component('simple-counter', {
    template: '<button v-on:click="counter++">{{ counter }}</button>',
    //data is technically a function,so Vue wont complain, but we return the same object refrence for each component instance.
    data: function () {
        return {
            counter: 0
        }
    }
});

var App0 = new Vue({
    el: '#App-0'
});

Vue.component('child', {
    props: ['message'],
    template: '<span>{{ message }}</span>'
});

var App1 = new Vue({
    el: '#App-1',
    methods: {
        propsss: function () {
            console.log(this.message);
        }
    }

});

Vue.component('anochild', {
    props: ['myMessage'],
    template: '<span>{{ myMessage }}</span>'
});

var App2 = new Vue({
    el: '#App-2',
    data: {
        parentMsg: ''
    }
});

Vue.component('button-counter',{
    template: '<button v-on:click="increment">{{ counter }}</button>',
    data: function () {
        return {
            counter: 0
        }
    },
    methods: {
        increment: function () {
            this.counter += 1;
            this.$emit('increment');
        }
    }
});

var App3 = new Vue({
    el: '#App-3',
    data: {
        total: 0
    },
    methods: {
        incrementTotal: function () {
            this.total += 1;
        }
    }
});

Vue.component('my-input', {
    template:'<div class="form-group"><label :for="randomId">{{ label }}:</label><input :id="randomId" :value="value" @input="onInput"></div>',
    //props down to the child component
    props: ['value', 'label'],
    data: function () {
        return {
            randomId: 'input-' + Math.random()
        }
    },
    methods: {
        onInput: function (event) {
            //emit up to the root
            this.$emit('input', event.target.value);
        }
    }
});

var App4 = new Vue({
    el: '#App-4',
    data: {
        message: 'Vue.js'
    }
});
