import {PerformsTasks, UsesAbilities, Enter, Text, Question, BrowseTheWeb} from 'serenity-js/protractor';
import {protractor} from 'protractor';
import {TodoList} from '../UI/TodoList';

export class AddATodoItem {
    static called(item: string) {
        return new AddATodoItem(item)
    }

    performAs(actor: PerformsTasks): PromiseLike<void>{
        return actor.attemptsTo(
            Enter.theValue(this.item)
                .into(TodoList.What_Need_To_Be_Done)
                .thenHit(protractor.Key.ENTER)
        )
    }

    constructor(private item: string){}
}

export class Items{
    static Displayed: Question<PromiseLike<string[]>> = Text.ofAll(TodoList.Item)
}

export class ItemList implements Question<PromiseLike<string[]>> {
    answeredBy(actor: UsesAbilities): PromiseLike<string[]> {
        return <any>BrowseTheWeb.as(actor).locateAll(TodoList.Item).getText();
    }
    constructor(){}
}