Redline UI is a black and red cyberpunk restyle for Claude chats. It frames your own messages in thin red, adds a red "CLAUDE // REPLY" label above each reply, turns the loading line into uppercase terminal text, and adds a slim red bar above the prompt plus a "REDLINE // ONLINE" status entry. It matches the Redline design system: near-black surfaces and one hot red (`#ff2338`).

It only restyles the parts a plugin can draw inside the chat. The app's window, sidebar and buttons are not affected.

## Install

In the desktop app: click + next to the prompt box, then Plugins, then Add marketplace, enter `Roxaslayer/redline-ui`, then Add plugin.

At the prompt of a terminal session:

```
/plugin install redline-ui --marketplace Roxaslayer/redline-ui
```

From a shell:

```
claude plugin install redline-ui --marketplace Roxaslayer/redline-ui
```

The repository is private, so the machine installing it needs a GitHub login that can read it (an SSH key, or `gh auth login` then `gh auth setup-git`).
