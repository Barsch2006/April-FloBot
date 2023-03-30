import { Client, CommandInteraction, EmbedBuilder, Colors, TextChannel } from 'discord.js'
import { AsyncDatabase } from 'src/sqlite/sqlite'
import { ILogger } from '../logger/logger'
import { v4 as uuid } from 'uuid'

export default async (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase): Promise<void> => {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  try {
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setTitle('Nice Try')
        .setImage('https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif')
        .setURL('https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif')
        .setColor(Colors.Purple)
        .setAuthor({ name: `Gebannt von: ${interaction.user.tag}` })
        .setTimestamp()],
      ephemeral: true
    })

    const channel = await interaction.guild?.channels.fetch('1091006513268662422') as TextChannel
    await channel?.send(`@${interaction.user.username} hat den Command **ban** ausgeführt.`)
  } catch (e) {
    logger.logSync("ERROR", 'Interaction could not be replied.')
  }
}
