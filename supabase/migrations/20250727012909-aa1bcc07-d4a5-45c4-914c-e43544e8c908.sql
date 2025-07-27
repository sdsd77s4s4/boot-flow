-- Create user profiles table for authentication
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'reseller', 'client')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create users table (for IPTV clients)
CREATE TABLE public.users (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  real_name TEXT,
  phone TEXT,
  telegram TEXT,
  whatsapp TEXT,
  m3u_url TEXT,
  bouquets TEXT,
  plan TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  devices INTEGER DEFAULT 1,
  credits INTEGER DEFAULT 0,
  expiration_date DATE,
  observations TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create users policies - only authenticated users can access
CREATE POLICY "Only authenticated users can view users" 
ON public.users 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can insert users" 
ON public.users 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Only authenticated users can update users" 
ON public.users 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can delete users" 
ON public.users 
FOR DELETE 
TO authenticated
USING (true);

-- Add updated_at trigger to users
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create resellers table
CREATE TABLE public.resellers (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  personal_name TEXT,
  permission TEXT DEFAULT 'reseller',
  credits INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  servers TEXT,
  master_reseller TEXT,
  disable_login_days INTEGER DEFAULT 0,
  monthly_reseller BOOLEAN DEFAULT false,
  telegram TEXT,
  whatsapp TEXT,
  observations TEXT,
  force_password_change TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on resellers
ALTER TABLE public.resellers ENABLE ROW LEVEL SECURITY;

-- Create resellers policies
CREATE POLICY "Only authenticated users can view resellers" 
ON public.resellers 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can insert resellers" 
ON public.resellers 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Only authenticated users can update resellers" 
ON public.resellers 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can delete resellers" 
ON public.resellers 
FOR DELETE 
TO authenticated
USING (true);

-- Add updated_at trigger to resellers
CREATE TRIGGER update_resellers_updated_at
  BEFORE UPDATE ON public.resellers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create cobrancas table
CREATE TABLE public.cobrancas (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cliente TEXT NOT NULL,
  email TEXT NOT NULL,
  descricao TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  vencimento DATE NOT NULL,
  status TEXT DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Paga', 'Vencida', 'Cancelada')),
  tipo TEXT NOT NULL,
  gateway TEXT,
  forma_pagamento TEXT,
  tentativas INTEGER DEFAULT 0,
  ultima_tentativa TIMESTAMP WITH TIME ZONE,
  proxima_tentativa TIMESTAMP WITH TIME ZONE,
  observacoes TEXT,
  tags TEXT[],
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on cobrancas
ALTER TABLE public.cobrancas ENABLE ROW LEVEL SECURITY;

-- Create cobrancas policies
CREATE POLICY "Only authenticated users can view cobrancas" 
ON public.cobrancas 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can insert cobrancas" 
ON public.cobrancas 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Only authenticated users can update cobrancas" 
ON public.cobrancas 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can delete cobrancas" 
ON public.cobrancas 
FOR DELETE 
TO authenticated
USING (true);

-- Add updated_at trigger to cobrancas
CREATE TRIGGER update_cobrancas_updated_at
  BEFORE UPDATE ON public.cobrancas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();