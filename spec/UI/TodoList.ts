import {Target, Text} from 'serenity-js/protractor';
import {by} from 'protractor';


export class TodoList {
    static What_Need_To_Be_Done = Target.the('"what need to be done" input')
        .located(by.id('new-todo'));

    static Item = Target.the('The list in the Todo page')
        .located(by.repeater('todo in todos'));

}