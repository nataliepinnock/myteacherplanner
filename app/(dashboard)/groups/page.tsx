import { redirect } from 'next/navigation';
import { getTeamForUser, getUser, getGroupsForUser } from '@/lib/db/queries';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);
  const groups = await getGroupsForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Groups: {groups.length}</p>
      <p>Team: {teamData.name}</p>
      <p>Team Members: {teamData.teamMembers.length}</p>
      <p>User: {user.name}</p>
      <p>User Email: {user.email}</p>
      <p>User Role: {user.role}</p>
      <p>User ID: {user.id}</p>
      <p>Team ID: {teamData.id}</p>
      <p>Team Members: {teamData.teamMembers.length}</p>
      <p>Groups: {groups.length}</p>
      <p>Groups: {groups.map((group) => group.name)}</p>
      <p>Groups: {groups.map((group) => group.id)}</p>
      
    </div>
  )
}
