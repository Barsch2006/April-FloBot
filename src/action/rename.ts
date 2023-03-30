import { Client, CommandInteraction, EmbedBuilder, Colors, GuildMember, TextChannel } from 'discord.js'
import { ILogger } from 'src/logger/logger'
import { randomInt } from 'crypto'
import { nicknames, adjectives, colors } from './rename-names'

const caseCorrectAndRemoveSpaces = (input: string): string => {
  return (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()).replace(/ /g, '')
}

export default async function rename(client: Client, interaction: CommandInteraction, logger: ILogger): Promise<void> {
  const user = interaction.member as GuildMember
  const userid = user.id

  const nick = caseCorrectAndRemoveSpaces(adjectives[randomInt(adjectives.length)]) + caseCorrectAndRemoveSpaces(colors[randomInt(colors.length)]) + caseCorrectAndRemoveSpaces(nicknames[randomInt(nicknames.length)])

  let dmSucess = false
  try {
    await interaction.guild?.members.edit(userid, { nick })

    const dm = await client.users.fetch(userid)
    await dm.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('Umbennenung')
          .setDescription('April! April! Du hast versucht jemanden zu trollen!')
          .setColor(Colors.Purple)
      ]
    })
    dmSucess = true
  } catch (e) {
    dmSucess = false
  }
  
  await interaction.reply({
    embeds: [
      new EmbedBuilder().setTitle(`Rename gescheitert an Inkompetenz`)
        .setColor(Colors.Red)
    ],
    ephemeral: true
  })
  const channel = await interaction.guild?.channels.fetch('1091006513268662422') as TextChannel
  await channel?.send(`@${interaction.user.username} hat den Command **rename** ausgeführt.`)
}
