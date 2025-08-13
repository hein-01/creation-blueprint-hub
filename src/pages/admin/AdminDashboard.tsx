import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TwoFactorSetup from "@/components/admin/TwoFactorSetup";
import { Shield, Users, Settings, LogOut, Crown } from "lucide-react";

export default function AdminDashboard() {
  const { adminProfile, loading, signOut, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const getRoleIcon = () => {
    switch (adminProfile?.admin_role) {
      case 'super_admin':
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'admin':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'moderator':
        return <Users className="h-5 w-5 text-green-500" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  const getRoleDisplayName = () => {
    switch (adminProfile?.admin_role) {
      case 'super_admin':
        return 'Super Administrator';
      case 'admin':
        return 'Administrator';
      case 'moderator':
        return 'Moderator';
      default:
        return 'Unknown Role';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">WellFinds Administration</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getRoleIcon()}
                <span>Admin Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">{getRoleDisplayName()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-mono text-xs">{adminProfile?.user_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Two-Factor Authentication</p>
                <p className={`font-medium ${adminProfile?.two_factor_enabled ? 'text-green-600' : 'text-red-600'}`}>
                  {adminProfile?.two_factor_enabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              {adminProfile?.last_login_at && (
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="text-sm">{new Date(adminProfile.last_login_at).toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <div className="md:col-span-2">
            <TwoFactorSetup />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Admin Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">User Management</h3>
              <p className="text-sm text-muted-foreground">Manage user accounts</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Security</h3>
              <p className="text-sm text-muted-foreground">Security settings</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Settings className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">System Settings</h3>
              <p className="text-sm text-muted-foreground">Configure system</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Crown className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Reports</h3>
              <p className="text-sm text-muted-foreground">View analytics</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}