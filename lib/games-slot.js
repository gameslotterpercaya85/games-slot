'use babel';

import GamesSlotView from './games-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  gamesSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gamesSlotView = new GamesSlotView(state.gamesSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gamesSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'games-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gamesSlotView.destroy();
  },

  serialize() {
    return {
      gamesSlotViewState: this.gamesSlotView.serialize()
    };
  },

  toggle() {
    console.log('GamesSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
