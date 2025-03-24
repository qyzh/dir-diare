import React from 'react';
import { Cpu, HardDrive, Monitor, Package, Terminal, EthernetPort, Proportions, Container } from 'lucide-react'; // Import icons from lucide-react

function WorkSpace() {
    const systemInfo = {
        gadget: 'qyzh@Marlboro',
        os: 'Ubuntu',
        distro: '24.04.2 LTS',
        kernel: 'Linux 6.11.0-19-generic',
        uptime: '3 days, 4 hours',
        packages: '1651 (dpkg), 13 (snap)',
        shell: 'zsh 5.8',
        resolution: '1920x1080',
        cpu: 'Intel(R) Core(TM) i7-7700HQz',
        gpu: 'NVIDIA GeForce GTX 1050',
        memory: '5.27 GiB / 7.64 GiB (69%)',
        disk : '512GB SSD',
        localip: '192.******.***.***',
    };

    return (
        <div className="p-4 text-gray-200 font-mono rounded-md">
            <pre>
                <span className="text-yellow-400">WorkSpace</span>
                <br />
                {systemInfo.gadget}<br/>
                =======================================
                <br />
                <Monitor className="inline mr-2" /> <span className='font-bold'>OS:</span> {systemInfo.os} {systemInfo.distro}
                <br />
                <Container className="inline mr-2"/> <span className='font-bold'>Kernel:</span> {systemInfo.kernel}
                <br />
                <Package className="inline mr-2" /> <span className='font-bold'>Packages:</span> {systemInfo.packages}
                <br />
                <Terminal className="inline mr-2" /> <span className='font-bold'>Shell:</span> {systemInfo.shell}
                <br />
                <Proportions className="inline mr-2"/> <span className='font-bold'>Resolution:</span> {systemInfo.resolution}
                <br />
                <Cpu className="inline mr-2" /> <span className='font-bold'>CPU:</span> {systemInfo.cpu}
                <br />
                <Cpu className="inline mr-2" /> <span className='font-bold'>GPU:</span> {systemInfo.gpu}
                <br />
                <HardDrive className="inline mr-2" /> <span className='font-bold'>Memory:</span> {systemInfo.memory}
                <br />
                <HardDrive className="inline mr-2" /> <span className='font-bold'>Disk (/):</span> {systemInfo.disk}
                <br />
                <EthernetPort className="inline mr-2"/> <span className='font-bold'>Local IP (enp3s0):</span> {systemInfo.localip}
                <br />
            </pre>
        </div>
    );
}

export default WorkSpace;
