import { Snippet } from "@nextui-org/react";
import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { cn } from "@/lib/utils";
import { Button } from "../button";
type CardProps = React.ComponentProps<typeof Card>;
import { useState, useEffect } from "react";
import { getUserByEmail, getUserFromTable } from "@/libs/UserLibs";
export default function MainMeSecCard({ className, ...props }: CardProps) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [existingUserName, setExistingUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByEmail();
        setUserEmail(user?.email);
        console.log(userEmail);

        const userDataFromTable = await getUserFromTable(user.email);
        setUserData(userDataFromTable);
        setExistingUserName(userData.nama_user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <section className="pb-28 font-montserrat">
        <div className="mt-4">
          <section className="flex justify-center items-center">
            <div className="max-w-md  lg:max-w-lg xl:max-w-lg w-full">
              <Card className={cn("", className)} {...props}>
                <CardHeader>
                  <section className="mx-auto font-bold">
                    <h1>Step 1: Copy Your Link</h1>
                  </section>
                </CardHeader>
                <CardContent>
                  <div className="mx-auto text-md text-center">
                    <section>https://l4tomo.vercel.app</section>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="mx-auto">
                    <Snippet size="sm">{`https://l4tomo.vercel.app/message/${existingUserName}`}</Snippet>
                  </div>
                </CardFooter>
              </Card>

              <div className="mt-4">
                <Card className={cn("", className)} {...props}>
                  <CardHeader>
                    <section className="mx-auto font-bold">
                      <h1>Step 2: Share Link On Your Story</h1>
                    </section>
                  </CardHeader>
                  <CardContent>
                    <div className="items-center flex justify-center">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `https://l4tomo.vercel.app/message/${existingUserName}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>Share On WhatsApp</Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
