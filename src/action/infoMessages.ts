import { Client, CommandInteraction, EmbedBuilder } from 'discord.js'
import { ILogger } from 'src/logger/logger'
import fs from 'fs'

export async function metafrage(client: Client, interaction: CommandInteraction, logger: ILogger): Promise<void> {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  try {
    await interaction.reply({
      content: `**Metafragen** sind Fragen, welche oft vor einer richtigen Frage gestellt werden.
Klassische Beispiele für Metafragen sind:
- Kann mir jemand mit JavaScript helfen?
- Wer kennt sich mit IP-Adressen aus?
Solche Fragen verhindern eine schnelle Antwort auf die eigentliche Frage. Oft denkt jemand nicht, im Fachgebiet "gut genug" zu sein, kennt aber die Antwort und könnte trotzdem nicht antworten. Auch wenn sich jemand meldet, muss er erst auf die Antwort des Fragestellers warten, bis er antworten kann.
__Stelle deine Frage direkt, ohne erstmal nach einem Experten zu suchen. Dies erspart dir Zeit und erhöht die Chance auf eine Antwort.__
[mehr Informationen](http://metafrage.de/)`
    })
    logger.logSync('INFO', 'Metafragen-Info gesendet.')
  } catch (err) {
    logger.logSync('ERROR', `Metafragen-Info konnte nicht gesendet werden!. Error: ${JSON.stringify(err)}`)
  }
}
export async function codeblocks(client: Client, interaction: CommandInteraction, logger: ILogger): Promise<void> {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  try {
    await interaction.reply({
      content: `**Codeblocks** sind in discord-Nachrichten integrierbare Blöcke, die Quellcode enthalten. Sie sehen so aus:
\`\`\`py
print("Hello World")
\`\`\`
Du erstellst sie mit drei \\\` vor deinem Code und drei \\\` nach deinem Code. Um das Syntax-Highlighting zu aktivieren, kannst du nach den ersten drei \\\` die Sprache dazuschreiben.
Der Codeblock von oben sieht so aus:
\\\`\\\`\\\`py
print("Hello World")
\\\`\\\`\\\`
Dadurch machst du deinen Code, im Vergleich zu normalem Text, besser lesbar für alle und kannst schneller eine Antwort auf deine Frage bekommen. Auch sind sie, im Vergleich zu Screenshots, sehr Datensparsam.
Codeblocks sind die beste Art, Code auf Discord zu teilen, und alle werden dir Dankbar sein, wenn du sie nutzt.
`
    })
    logger.logSync('INFO', 'Codeblock-Info gesendet.')
  } catch (err) {
    logger.logSync('ERROR', `Codeblock-Info konnte nicht gesendet werden. Error: ${JSON.stringify(err)}`)
  }
}

export async function about(client: Client, interaction: CommandInteraction, logger: ILogger): Promise<void> {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  let buildInfo = ''

  if (fs.existsSync('./.build-info')) {
    buildInfo = fs.readFileSync('./.build-info', { encoding: 'utf-8' })
  } else {
    buildInfo = '.build-info konnte nicht gefunden werden'
  }

  const aboutEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Etwas über mich')
    .setAuthor({ name: 'Moderation Bot', url: 'https://discord.js.org' })
    .setDescription('Ich bin ein Discord-Bot, der für die Administration, Verwaltung und Moderation des Servers von <@950222367311937606> erstellt wurde. ' +
      'Um zu sehen, was ich alles kann, nutze einfach /help.\n\n**__Meine Entwickler:__**')
    // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'heeecker', value: '<@768872955500953710>\nheeecker#5770', inline: true },
      { name: 'oglimmer', value: '<@441658607818375183>\noglimmer#4256', inline: true },
      { name: 'Christian.sh', value: '<@779419763938951228>\nChristian.sh#2486', inline: true },
      { name: 'Mickhat', value: '<@226223176269561857>\nMickhat#1337', inline: true },
      { name: '\u200B', value: '\u200B' },
      { name: 'Github Build:', value: buildInfo },
      { name: 'Github Repo:', value: 'https://github.com/Mickhat/FloBot' }
    )
    .setTimestamp()
    .setFooter({ text: '\u200B', iconURL: 'https://cdn.discordapp.com/attachments/959462282939756624/1041868727613927424/flobot.png' })

  try {
    await interaction.reply({
      embeds: [aboutEmbed]
    })
    logger.logSync('INFO', 'About-info gesendet.')
  } catch (err) {
    logger.logSync('ERROR', `About-Info konnte nicht gesendet werden. ${JSON.stringify(err)}`)
  }
}

export async function ping(client: Client, interaction: CommandInteraction, logger: ILogger): Promise<void> {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  let timeout = Math.random()
  if (timeout <= 0.4) {
    interaction.deferReply(); // sendet eine initiale Antwort
    setTimeout(async () => {
      const sent = await interaction.editReply({ content: "Pinging..." });
      setTimeout(() => {
        interaction.editReply({
          content: "Ping wird ausgefürt. 100 % abgeschlossen. Schalten Sie Ihren Discord Client nicht aus."
        }).then(() => {
          logger.logSync('INFO', 'Pong 1.1 wurde erfolgreich gesendet.');
        }).catch((err) => {
          logger.logSync('ERROR', `Ping 1.1 konnte nicht gesendet werden. Error ${JSON.stringify(err)}`);
        });
        setTimeout(() => {
          interaction.editReply({
            content: "Sind sie in Deutschland?"
          }).then(() => {
            logger.logSync('INFO', 'Pong 1.2 wurde erfolgreich gesendet.');
          }).catch((err) => {
            logger.logSync('ERROR', `Ping 1.2 konnte nicht gesendet werden. Error ${JSON.stringify(err)}`);
          });
          setTimeout(() => {
            interaction.editReply({
              content: `Informationen zum Ping von ${interaction.user.username}: heute circa 5 Minuten später: PONG!\nCurrent Bot latency: ${client.ws.ping * 750}ms\nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp * 10}ms`
            }).then(() => {
              logger.logSync('INFO', 'Pong 1.3 wurde erfolgreich gesendet.');
            }).catch((err) => {
              logger.logSync('ERROR', `Ping 1.3 konnte nicht gesendet werden. Error ${JSON.stringify(err)}`);
            });
          }, 100000 * timeout);
        }, 500000 * timeout);
      }, 100000 * timeout);
    }, 50000 * timeout);
  } else {
    return
  }
}
