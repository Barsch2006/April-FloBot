import { SlashCommandBuilder } from "discord.js"

export const registerRMCommands = (): any => {
    return new SlashCommandBuilder()
    .setName('rm')
    .setDescription('RealCommands for Mods')
}
