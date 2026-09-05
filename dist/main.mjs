async function readaloudText(section, behavior, token, defaultPath = "pf2e-return-of-the-runelords-assets/voice-lines") {
    if (!game.users.activeGM.isSelf) return;
    if (token && !['character', 'familiar'].includes(token.actor.type)) return;
    const sceneName = game.scenes.active.name;
    const lines = await fetch(`./${defaultPath}/${sceneName.replace('\'', '')}/lines.json`).then(a => a.json());
    const line = lines[section];
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
    const playOnSceneLoad = await fetch(`pf2e-return-of-the-runelords-assets/voice-lines/scenes.json`).then(a => a.json());
    const sceneName = game.scenes.active.name;
    if (sceneName in playOnSceneLoad) {
        await readaloudText(playOnSceneLoad[sceneName]);
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