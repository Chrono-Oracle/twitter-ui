'use client'

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DialogDemoProps {
  profile: ProfileData;
  onSave: (data: ProfileData) => void;
}
interface ProfileData {
  name: string;
  username: string;
  bio: string;
  location: string;
  // Add other fields you need (bio, location, etc.)
}

export function DialogDemo( { profile, onSave }: DialogDemoProps ) {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<ProfileData>({ 
    name: "",
    username: "",
    bio: "",
    location: ""
  });

    useEffect(() => {
        if (open) {
        setFormData(profile);
        }
    }, [open, profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button className="bg-transparent rounded-3xl text-[#1DA1F2] border border-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white hover:cursor-pointer" >Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required 
            />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
                type="submit"
                onClick={() => {
                console.log("Manual save clicked");
                onSave(formData);
                setOpen(false);
             }}
            >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
