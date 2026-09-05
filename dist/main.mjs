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

function sceneData() {
    return game.scenes.active.getFlag('pf2e-return-of-the-runelords-map-remake', 'readaloud');
}

async function setSceneRead(value) {
    return await game.scenes.active.setFlag('pf2e-return-of-the-runelords-map-remake', 'readaloud', {
        onload: value,
    });
}

async function playSceneText() {
    const data = await fetch(resolvePath()).then(a => a.json());
    if ('events' in data && 'onload' in data.events && sceneData()?.onload !== true && game.users.activeGM.isSelf) {
        const confirmed = await Dialog.confirm({
            title: "Play Readaloud Text",
            defaultYes: true
        });
        if (confirmed) {
            await readaloudText(data.events.onload);
            await setSceneRead(true);
        }
    }
}

Hooks.on('init', () => {
    game.pf2eReturnOfTheRunelordsMapRemake = {
        readaloudText,
        resetSceneRead: () => setSceneRead(false),
    };
})


Hooks.on('canvasReady', async () => {
    playSceneText()
})