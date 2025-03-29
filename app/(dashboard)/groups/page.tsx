import { redirect } from 'next/navigation';
import { getTeamForUser, getUser, getGroupsForUser } from '@/lib/db/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


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
     <div className="flex justify-end mb-4">
        <Button>Create Group</Button>
     </div>
   
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Created {new Date(group.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
