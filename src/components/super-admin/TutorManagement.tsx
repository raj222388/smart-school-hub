import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2, Star, MapPin, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

interface Tutor {
  id: string;
  name: string;
  subject: string;
  classes: string;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  price: string;
  verified: boolean;
  plan: string;
  image: string | null;
  bio: string | null;
  is_active: boolean;
}

const emptyTutor = {
  name: '',
  subject: '',
  classes: '',
  location: '',
  rating: 0,
  reviews: 0,
  experience: '',
  price: '',
  verified: false,
  plan: 'Monthly',
  image: '',
  bio: '',
  is_active: true,
};

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Hindi', 'Social Science'];
const plans = ['Monthly', 'Yearly', 'Lifetime'];

const TutorManagement = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const [form, setForm] = useState(emptyTutor);

  const fetchTutors = async () => {
    const { data, error } = await supabase
      .from('tutors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load tutors');
    } else {
      setTutors(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const openAdd = () => {
    setEditingTutor(null);
    setForm(emptyTutor);
    setDialogOpen(true);
  };

  const openEdit = (tutor: Tutor) => {
    setEditingTutor(tutor);
    setForm({
      name: tutor.name,
      subject: tutor.subject,
      classes: tutor.classes,
      location: tutor.location,
      rating: tutor.rating,
      reviews: tutor.reviews,
      experience: tutor.experience,
      price: tutor.price,
      verified: tutor.verified,
      plan: tutor.plan,
      image: tutor.image || '',
      bio: tutor.bio || '',
      is_active: tutor.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.subject) {
      toast.error('Name and subject are required');
      return;
    }

    const payload = {
      name: form.name,
      subject: form.subject,
      classes: form.classes,
      location: form.location,
      rating: form.rating,
      reviews: form.reviews,
      experience: form.experience,
      price: form.price,
      verified: form.verified,
      plan: form.plan,
      image: form.image || null,
      bio: form.bio || null,
      is_active: form.is_active,
    };

    if (editingTutor) {
      const { error } = await supabase
        .from('tutors')
        .update(payload)
        .eq('id', editingTutor.id);
      if (error) {
        toast.error('Failed to update tutor');
        return;
      }
      toast.success('Tutor updated');
    } else {
      const { error } = await supabase
        .from('tutors')
        .insert(payload);
      if (error) {
        toast.error('Failed to add tutor');
        return;
      }
      toast.success('Tutor added');
    }

    setDialogOpen(false);
    fetchTutors();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tutor?')) return;
    const { error } = await supabase.from('tutors').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete tutor');
    } else {
      toast.success('Tutor deleted');
      fetchTutors();
    }
  };

  const toggleActive = async (tutor: Tutor) => {
    const { error } = await supabase
      .from('tutors')
      .update({ is_active: !tutor.is_active })
      .eq('id', tutor.id);
    if (error) {
      toast.error('Failed to update status');
    } else {
      fetchTutors();
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Tutor Management</h2>
          <p className="text-muted-foreground">Add, edit, and manage all tutors on the platform</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Tutor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTutor ? 'Edit Tutor' : 'Add New Tutor'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2">
                <Label>Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Subject *</Label>
                <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Plan</Label>
                <Select value={form.plan} onValueChange={(v) => setForm({ ...form, plan: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {plans.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Classes</Label>
                <Input value={form.classes} onChange={(e) => setForm({ ...form, classes: e.target.value })} placeholder="e.g. 9th - 12th" />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <Label>Experience</Label>
                <Input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 10 years" />
              </div>
              <div>
                <Label>Price</Label>
                <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. ₹500/hr" />
              </div>
              <div>
                <Label>Rating</Label>
                <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <Label>Reviews Count</Label>
                <Input type="number" value={form.reviews} onChange={(e) => setForm({ ...form, reviews: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="col-span-2">
                <Label>Image URL</Label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>
              <div className="col-span-2">
                <Label>Bio</Label>
                <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.verified} onCheckedChange={(v) => setForm({ ...form, verified: v })} />
                <Label>Verified</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <Label>Active</Label>
              </div>
              <div className="col-span-2">
                <Button onClick={handleSave} className="w-full">{editingTutor ? 'Update Tutor' : 'Add Tutor'}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutors.map((tutor) => (
          <Card key={tutor.id} className="p-4">
            <div className="flex items-start gap-3 mb-3">
              {tutor.image ? (
                <img src={tutor.image} alt={tutor.name} className="w-14 h-14 rounded-xl object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground truncate">{tutor.name}</h3>
                  <Badge variant={tutor.is_active ? 'default' : 'secondary'} className="text-xs ml-2 shrink-0">
                    {tutor.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tutor.subject} • {tutor.location}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  {tutor.rating} ({tutor.reviews}) • {tutor.plan}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(tutor)}>
                <Pencil className="w-3 h-3 mr-1" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => toggleActive(tutor)}>
                {tutor.is_active ? 'Hide' : 'Show'}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(tutor.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TutorManagement;
