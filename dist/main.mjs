function resolvePath() {
    const sceneName = game.scenes.active.name.replace('\'', '');
    return 'pf2e-return-of-the-runelords-assets/voice-lines/' + sceneName + '/data.json';
}

async function readaloudText(section, behavior, token) {
    if (!game.users.activeGM.isSelf) return;
    if (token && !['character', 'familiar'].includes(token.actor.type)) return;
    const sceneName = game.scenes.active.name;
    const data = await fetch(resolvePath()).then(a => a.json());
    const line = data.lines[section];
    if (behavior) {
        await behavior.update({disabled: true});
    }
    const sound = game.playlists.getName(sceneName)?.sounds?.getName(section);
    const todos = [];
    if (sound) todos.push(sound.update({"playing": true}))
    if (line) todos.push(ChatMessage.create({content: line}))
    await Promise.all(todos);
}

async function playSceneText(){
    const data = await fetch(resolvePath()).then(a => a.json());
    if ('events' in data && 'onload' in data.events) {
        await readaloudText(data.events.onload);
    }
}

Hooks.on('init', () => {
    game.pf2eReturnOfTheRunelordsMapRemake = {
        readaloudText,
    };
})


Hooks.on('canvasReady', async () => {
    playSceneText()
})