import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, School, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SchoolData {
  id: string;
  name: string;
  logo_url: string | null;
  address: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string;
}

const SchoolManagement = () => {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact_email: '',
    contact_phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch schools',
      });
    } else {
      setSchools(data || []);
    }
  };

  const handleAddSchool = async () => {
    if (!formData.name.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'School name is required',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from('schools').insert({
      name: formData.name,
      address: formData.address || null,
      contact_email: formData.contact_email || null,
      contact_phone: formData.contact_phone || null,
    });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add school',
      });
    } else {
      toast({
        title: 'Success',
        description: 'School added successfully',
      });
      setIsAddModalOpen(false);
      resetForm();
      fetchSchools();
    }

    setIsLoading(false);
  };

  const handleEditSchool = async () => {
    if (!selectedSchool || !formData.name.trim()) return;

    setIsLoading(true);

    const { error } = await supabase
      .from('schools')
      .update({
        name: formData.name,
        address: formData.address || null,
        contact_email: formData.contact_email || null,
        contact_phone: formData.contact_phone || null,
      })
      .eq('id', selectedSchool.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update school',
      });
    } else {
      toast({
        title: 'Success',
        description: 'School updated successfully',
      });
      setIsEditModalOpen(false);
      resetForm();
      fetchSchools();
    }

    setIsLoading(false);
  };

  const handleDeleteSchool = async () => {
    if (!selectedSchool) return;

    setIsLoading(true);

    const { error } = await supabase
      .from('schools')
      .delete()
      .eq('id', selectedSchool.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete school',
      });
    } else {
      toast({
        title: 'Success',
        description: 'School deleted successfully',
      });
      setIsDeleteModalOpen(false);
      setSelectedSchool(null);
      fetchSchools();
    }

    setIsLoading(false);
  };

  const openEditModal = (school: SchoolData) => {
    setSelectedSchool(school);
    setFormData({
      name: school.name,
      address: school.address || '',
      contact_email: school.contact_email || '',
      contact_phone: school.contact_phone || '',
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (school: SchoolData) => {
    setSelectedSchool(school);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      contact_email: '',
      contact_phone: '',
    });
    setSelectedSchool(null);
  };

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add School
        </Button>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school, index) => (
          <motion.div
            key={school.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <School className="w-7 h-7 text-primary" />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditModal(school)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => openDeleteModal(school)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">{school.name}</h3>

            <div className="space-y-2 text-sm">
              {school.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{school.address}</span>
                </div>
              )}
              {school.contact_email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{school.contact_email}</span>
                </div>
              )}
              {school.contact_phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{school.contact_phone}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-12">
          <School className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No schools found</p>
        </div>
      )}

      {/* Add School Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New School</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">School Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter school name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input
                id="phone"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSchool} disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add School'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit School Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit School</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">School Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Contact Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Contact Phone</Label>
              <Input
                id="edit-phone"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSchool} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete School</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete <strong>{selectedSchool?.name}</strong>? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSchool} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolManagement;
