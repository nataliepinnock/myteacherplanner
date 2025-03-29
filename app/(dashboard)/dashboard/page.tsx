import { redirect } from 'next/navigation';
import { getTeamForUser, getUser} from '@/lib/db/queries';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  return (
    <div>
      <h1>{user.email}'s Dashboard</h1>

    </div>
  )
}
