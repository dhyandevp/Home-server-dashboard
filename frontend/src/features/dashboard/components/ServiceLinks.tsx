import { ExternalLink, Shield, Router, Database, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

interface Service {
    name: string;
    url: string;
    icon: any;
    description: string;
    color: string;
}

const services: Service[] = [
    {
        name: 'Router Admin',
        url: 'http://192.168.1.1/admin/login_en.asp',
        icon: Router,
        description: 'Network Gateway',
        color: 'text-action',
    },
    {
        name: 'Pi-hole',
        url: 'http://192.168.1.5/admin/login',
        icon: Shield,
        description: 'Ad Blocking & DNS',
        color: 'text-success',
    },
    {
        name: 'Vault Manager',
        url: 'https://battlestation1.tail5bdcdb.ts.net/#/vault',
        icon: Lock,
        description: 'Password & Secrets',
        color: 'text-secondary',
    }
];

export function ServiceLinks() {
    return (
        <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
                <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {services.map((service) => (
                        <div
                            key={service.name}
                            className="flex items-center justify-between rounded-sm border border-border p-3 hover:bg-hover transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`flex h-9 w-9 items-center justify-center rounded-sm bg-surface`}>
                                    <service.icon className={`h-5 w-5 ${service.color}`} />
                                </div>
                                <div>
                                    <div className="font-medium text-primary">{service.name}</div>
                                    <div className="text-xs text-muted">{service.description}</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" asChild className="text-muted hover:text-white">
                                <a href={service.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
