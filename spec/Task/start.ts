import {Task, PerformsTasks, Open} from 'serenity-js/protractor';
import {AddATodoItem} from './AddATodoItem';

export class Start implements Task{
    static withContaining(item: string[]) {
        return new Start(item);
    }

    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Open.browserOn('http://todomvc.com/examples/angularjs/#/'),
            ...this.addAll(this.item)
        );
    }

    constructor(private item: string[]){}

    private addAll(items: string[]): Task[] {
        return items.map(items=>AddATodoItem.called(items));
    }
}