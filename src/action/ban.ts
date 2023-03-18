import { Client, CommandInteraction, EmbedBuilder, Colors } from 'discord.js'
import { AsyncDatabase } from 'src/sqlite/sqlite'
import { ILogger } from '../logger/logger'
import { v4 as uuid } from 'uuid'

export default async (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase): Promise<void> => {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  const target = interaction.options.get('target', true).value?.toString() ?? ''
  const reason = interaction.options.get('reason', true).value?.toString() ?? ''
  let dmSucess: boolean

  // send dm
  try {
    const dm = await client.users.fetch(target)
    await dm.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('April April!')
          .setDescription('Bitte sag es niemandem weiter. Du wurdest natürlich nicht gebannt ;)')
          .addFields(
            { name: 'Grund', value: reason }
          )
          .setColor(Colors.Purple)
      ]
    })
    dmSucess = true
  } catch (e) {
    dmSucess = false
  }

  try {
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setTitle('User wurde gebannt')
        .setDescription((dmSucess) ? `<@${target.toString()}> wurde erfolgreich benachrichtigt und gebannt.` : `<@${target.toString()}> wurde erfolgreich gebannt. Die Benachrichtigung konnte nicht versendet werden.`)
        .setColor(Colors.Purple)
        .setAuthor({ name: `Gebannt von: ${interaction.user.tag}` })
        .addFields({ name: 'Grund', value: reason })
        .setTimestamp()],
      ephemeral: false
    })
  } catch (e) {
    logger.logSync("ERROR", 'Interaction could not be replied.')
  }
}
